
import { createClient } from "@/lib/supabaseServerClient";


const companyService = {
  saveCompanyInfo: async ( name: string, address: string, website: string, primaryColor: string, secondaryColor: string) => {
   if(!name || !address || !website || !primaryColor || !secondaryColor) {
        return { error: 'Company information is required', status: 400 };
   }
   
   const supabase = await createClient();
   try {
         const { data, error } = await supabase
              .from('company_info')
              .insert([{ website, primaryColor, secondaryColor }]);
         if (error) {
              return { error: error.message, status: 400 };
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
