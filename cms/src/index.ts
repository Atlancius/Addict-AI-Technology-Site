import { seedPremium } from "./seed/premium";

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: { log: { info: (msg: string) => void } } }) {
    try {
      await seedPremium(strapi as any);
      strapi.log.info("Premium seed: done");
    } catch (error) {
      strapi.log.info("Premium seed: skipped");
    }
  },
};
