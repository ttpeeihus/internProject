const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
    const allUsers = await prisma.users.findMany();
    console.log('All Users:', allUsers);
    const newUser = await prisma.users.create({
        data: {
            Role: 'defaultRole',
            UserID: '44',
            Username: 'John Doe',
            PasswordHash: 'defaultPasswordHash',
            Email: 'john.doe@example.com',
        },
    });
    console.log('New User:', newUser);
}
main()
    .catch(e => {
    throw e;
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=prisma.js.map