const prismaUserDb = new PrismaClient({
  datasources: {
    db: {
      url: "postgresql://kata:aightwhatever@localhost:5432/spa-db?schema=public",
    },
  },
});

const prismaBusinessDb = new PrismaClient({
  datasources: {
    db: {
      url: "postgresql://piss:boyboy@localhost:5443/pissboy-db?schema=public",
    },
  },
});
