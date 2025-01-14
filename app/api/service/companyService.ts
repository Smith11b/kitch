
import { createClient } from "@/config/supabaseServerClient";
import { TableNames } from "@/lib/enums/TableNames";
import { CompanyUpdate } from "@/types/database-models";
import { CompanyRepository } from "../repository/CompanyRepository";
import { SupabaseClient } from "@supabase/supabase-js";
import { LocationRepository } from "../repository/LocationRepository";

class CompanyService {
    private companyRepository: CompanyRepository;
    private locationRepository: LocationRepository;

    constructor(supabase: SupabaseClient) {
        this.companyRepository = new CompanyRepository(supabase);
        this.locationRepository = new LocationRepository(supabase);
    }

    saveCompanyInfo = async (name: string, address: string, website: string, primaryColor: string, secondaryColor: string) => {
        if (!name || !address || !website || !primaryColor || !secondaryColor) {
            return { error: 'Company information is required', status: 400 };
        }

        const user = await supabase.auth.user();
        if (!user) {
            return { error: 'User not authenticated', status: 401 };
        }

        const company = await this.companyRepository.getCompanyByOwnerId(user.id);
        if (company) {
            return { error: 'Company already exists for this user', status: 400 };
        }

        const companyData = {
            name,
            owner_id: user.id,
        };


        const companyId = await this.companyRepository.updateCompany(companyData, user);
        const locationData = {
            address,
            website,
            primaryColor,
            secondaryColor,
            organization_id: companyId,
        };
        const { data } = await this.locationRepository.createLocation(locationData);
        return { success: true, data: companyData, status: 200 };
    }
}








const companyService = {
  saveCompanyInfo: async ( name: string, address: string, website: string, primaryColor: string, secondaryColor: string) => {
   if(!name || !address || !website || !primaryColor || !secondaryColor) {
        return { error: 'Company information is required', status: 400 };
   }

   const supabase = await createClient();
   try {

    const user = await supabase.auth.getUser();
    if (!user) {
        return { error: 'User not authenticated', status: 401 };
    }
         const { data, error } = await supabase
              .from(TableNames.organizations)
              .update<CompanyUpdate>({
                name,
                owner_id: user.data.user?.id
               })
               .eq('owner_id', user.data.user?.id)
               .select('owner_id');

        const { error: companyError} = await supabase
        .from(TableNames.locations)
        .insert([{ address, website, primaryColor, secondaryColor, organization_id: data![0]}]);
         if (error || companyError) {
              return { error: error?.message || companyError?.message, status: 400 };
         }
         return { success: true, data , status: 200};
   }
    catch (error) {
            if (error instanceof Error) {
                  return { error: error.message || 'Internal Server Error', status: 500 };
            }
            return { error: 'Internal Server Error', status: 500 };
    }
  },
}

export default companyService;
