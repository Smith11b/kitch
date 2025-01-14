import { SupabaseClient } from "@supabase/supabase-js";
import { TableNames } from "@/lib/enums/TableNames";
import { Company, CompanyUpdate } from "@/types/database-models";

export class CompanyRepository {
    private database: SupabaseClient;

    constructor(database: SupabaseClient) {
        this.database = database;
    }

    getCompanyById = async (id: string) => {
        const { data, error } = await this.database
            .from(TableNames.organizations)
            .select('*')
            .eq('id', id);
        if (error) {
            throw new Error(error.message);
        }
        return data[0];
    }

    getCompanyByOwnerId = async (ownerId: string) : Promise<Company> => {
        const { data, error } = await this.database
            .from(TableNames.organizations)
            .select('*')
            .eq('owner_id', ownerId);
        if (error) {
            throw new Error(error.message);
        }
        return data[0];
    }

    updateCompany = async (updateData: CompanyUpdate, user: { data: { user?: { id: string } } }) : Promise<string> => {
            const { data, error } = await this.database
                .from(TableNames.organizations)
                .update<CompanyUpdate>(updateData)
                .eq('owner_id', user.data.user?.id)
                .select('id');
            if (error) {
                throw new Error(error.message);
            }
            return data[0].id;
    }

}
