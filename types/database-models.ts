import { Database } from "./database.types";

export type Profile = Database['public']['Tables']['profiles']['Row'];

export type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];

export type UserRoles = Database['public']['Tables']['userRoles']['Row'];

export type Address = Database['public']['Tables']['customer_addresses']['Row'];

export type Company = Database['public']['Tables']['organizations']['Row'];

export type CompanyUpdate = Database['public']['Tables']['organizations']['Update'];

export type Storefront = Database['public']['Tables']['storefronts']['Row'];

export type Meal = Database['public']['Tables']['meals']['Row'];

export type Order = Database['public']['Tables']['orders']['Row'];

export type Subscription = Database['public']['Tables']['subscriptions']['Row'];

export type locations = Database['public']['Tables']['locations']['Row'];

export type LocationCreate = Database['public']['Tables']['locations']['Insert'];

export type LocationUpdate = Database['public']['Tables']['locations']['Update'];

export type OrderMealsJoin = Database['public']['Tables']['order_meals']['Row'];

export type SubscriptionMealsJoin = Database['public']['Tables']['subscription_meals']['Row'];
