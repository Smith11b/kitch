import { TableNames } from "@/lib/enums/TableNames";
import { LocationCreate } from "@/types/database-models";
import { SupabaseClient } from "@supabase/supabase-js";


export class LocationRepository {
    private database: SupabaseClient;

    constructor(database: SupabaseClient) {
        this.database = database;
    }

    getLocationById = async (id: string) => {
        const { data, error } = await this.database
            .from(TableNames.locations)
            .select('*')
            .eq('id', id);
        if (error) {
            throw new Error(error.message);
        }
        return data;
    }

    getAllLocationsByOrganizationId = async (organizationId: string) => {
        const { data, error } = await this.database
            .from(TableNames.locations)
            .select('*')
            .eq('organization_id', organizationId);
        if (error) {
            throw new Error(error.message);
        }
        return data;
    }

    createLocation = async (locationData: LocationCreate) => {
        const { data, error } = await this.database
            .from(TableNames.locations)
            .insert([locationData])
            .select('id');
        if (error) {
            throw new Error(error.message);
        }
        return data;
    }

    updateLocation = async (locationData: LocationCreate, id: string) => {
        const { data, error } = await this.database
            .from(TableNames.locations)
            .update(locationData)
            .eq('id', id)
            .select('id');
        if (error) {
            throw new Error(error.message);
        }
        return data;
    }

    deleteLocation = async (id: string) => {
        const { error } = await this.database
            .from(TableNames.locations)
            .delete()
            .eq('id', id);
        if (error) {
            throw new Error(error.message);
        }
    }
}
