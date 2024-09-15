drop policy "Can update own user data." on "public"."users";

drop policy "Can view own user data." on "public"."users";

revoke delete on table "public"."customers" from "anon";

revoke insert on table "public"."customers" from "anon";

revoke references on table "public"."customers" from "anon";

revoke select on table "public"."customers" from "anon";

revoke trigger on table "public"."customers" from "anon";

revoke truncate on table "public"."customers" from "anon";

revoke update on table "public"."customers" from "anon";

revoke delete on table "public"."customers" from "authenticated";

revoke insert on table "public"."customers" from "authenticated";

revoke references on table "public"."customers" from "authenticated";

revoke select on table "public"."customers" from "authenticated";

revoke trigger on table "public"."customers" from "authenticated";

revoke truncate on table "public"."customers" from "authenticated";

revoke update on table "public"."customers" from "authenticated";

revoke delete on table "public"."customers" from "service_role";

revoke insert on table "public"."customers" from "service_role";

revoke references on table "public"."customers" from "service_role";

revoke select on table "public"."customers" from "service_role";

revoke trigger on table "public"."customers" from "service_role";

revoke truncate on table "public"."customers" from "service_role";

revoke update on table "public"."customers" from "service_role";

alter table "public"."customers" drop constraint "customers_id_fkey";

alter table "public"."customers" drop constraint "customers_pkey";

drop index if exists "public"."customers_pkey";

drop table "public"."customers";

alter table "public"."users" add column "stripe_customer_id" text;

create policy "Can update own user data."
on "public"."users"
as permissive
for update
to authenticated
using ((auth.uid() = id));


create policy "Can view own user data."
on "public"."users"
as restrictive
for select
to authenticated
using ((auth.uid() = id));



