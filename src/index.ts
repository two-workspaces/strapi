import type { Core } from '@strapi/strapi';

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * Railway template: create the super admin from STRAPI_ADMIN_EMAIL and
   * STRAPI_ADMIN_PASSWORD on first boot. Without this, /admin offers a
   * "create the first administrator" form to whoever opens the URL first.
   * Once any admin exists this does nothing, so changing the variables later
   * changes no account.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    const email = process.env.STRAPI_ADMIN_EMAIL?.trim().toLowerCase();
    const password = process.env.STRAPI_ADMIN_PASSWORD;
    if (!email || !password) return;

    const users = strapi.service('admin::user');
    if (await users.exists()) return;

    const superAdmin = await strapi.service('admin::role').getSuperAdmin();
    if (!superAdmin) {
      strapi.log.warn('No super admin role yet; open /admin to create the first administrator.');
      return;
    }
    await users.create({
      email,
      firstname: process.env.STRAPI_ADMIN_FIRSTNAME || 'Admin',
      lastname: process.env.STRAPI_ADMIN_LASTNAME || '',
      password,
      isActive: true,
      registrationToken: null,
      roles: [superAdmin.id],
    });
    strapi.log.info(`Created the super admin ${email} from STRAPI_ADMIN_EMAIL.`);
  },
};
