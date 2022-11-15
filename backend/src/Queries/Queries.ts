import { Prisma, PrismaClient, Step } from "@prisma/client";

import { BaseTest, Test } from "src/utils";

export const prisma = new PrismaClient();

export async function getTesterQuery() {
    return await prisma.tester.findFirst();
}

export async function getTestsQuery(testerId: number, notifiable?: boolean) {
    const whereClause = { where: {
        testerId
    }};

    if (notifiable) {
        Object.assign(
            whereClause.where,
            {
                notified: false,
                done: true,
                pending: false
            }
        );
    }

    return await prisma.test.findMany({
        ...whereClause,

		include: {
			steps: {
                orderBy: {
                    order: 'asc'
                }
            }
		},

        orderBy: [
            {
                orderNumber: 'asc'
            }
        ]
    });
}

export async function getTestQuery(testerId: number, name: string) {
    return await prisma.test.findFirst({
        where: {
            name,
            testerId,
        },
        include: {
            steps: {
                orderBy: {
                    order: 'asc'
                }
            }
        }
    });
}

export async function getLoginTest(testerId: number) {
    return await prisma.test.findFirst({
        where: {
            testerId,
            isLogin: true,
        },
        include: {
            steps: {
                orderBy: {
                    order: 'asc'
                }
            }
        }
    })
}

export async function updateTestsQuery(tests: Test[]) {
    const arrayOfPromises = [];
    for (const test of tests) {
        arrayOfPromises.push(prisma.test.update({
            where: {
                name: test.name
            },
            data: {
                diffPath: test.diffPath,
                imagePath: test.imagePath,
                lastImagePath: test.lastImagePath,

                done: test.done,
                pending: test.pending,
                hasDiff: test.hasDiff,
                notified: test.notified,

                error: test.error,
            },
            select: {
                name: true
            }
        }));
    }

    return await Promise.all(arrayOfPromises);
}

export async function createTestQuery(testerId: number, test: BaseTest) {
    await prisma.test.create({
        data: {
            name: test.name,
            testerId: testerId,
            isLogin: test.isLogin,
            orderNumber: test.orderNumber
        }
    });

    return await prisma.step.createMany({
        data: test.steps.map(step => {
            return {
                id: step.id,
                testId: test.name,

                order: step.order,
                action: step.action,
                args: step.args as Prisma.JsonArray,
            };
        })
    });
}

export async function editTestsQuery(tests: Test[]) {
    const arrayOfPromises = [];
    for (const test of tests) {
        arrayOfPromises.push(prisma.test.update({
            where: {
                name: test.name
            },

            data: {
                name: test.name,
                isLogin: test.isLogin,
            }
        }));

        for (const step of test.steps) {
            arrayOfPromises.push(prisma.step.upsert({
                where: {
                    id: step.id
                },

                update: {
                    testId: test.name,

                    order: step.order,
                    action: step.action,
                    args: step.args as Prisma.JsonArray,
                },

                create: {
                    id: step.id,
                    testId: test.name,

                    order: step.order,
                    action: step.action,
                    args: step.args as Prisma.JsonArray,
                }
            }));
        }
    }

    return await Promise.all(arrayOfPromises);
}

export async function updateOrCreateStepQuery(step: Step) {
    // WORKAROUND
    // Upsert needs a where clause searching for a unique field, in this case we 
    // need to create if does not exist, but we can not use id: undefined or the
    // query will throw an error.
    // The autoincrement used on the ID field starts from 1, so when the id key is
    // missing from the Step object, we use the 0 value.
    return await prisma.step.upsert({
        where: {
            id: step.id || 0,
        },

        create: {
            id: step.id,
            testId: step.testId,

            order: step.order,
            action: step.action,
            args: step.args as Prisma.JsonArray,
        },

        update: {
            order: step.order,
            action: step.action,
            args: step.args as Prisma.JsonArray,
        }
    });
}

export async function reorderStepsQuery(steps: Step[]) {
    const arrayOfPromises = [];
    for (const step of steps) {
        arrayOfPromises.push(updateOrCreateStepQuery(step));
    }

    return await Promise.all(arrayOfPromises);
}

export async function deleteStepQuery({ id }: { id: number }) {
    return await prisma.step.delete({
        where: {
            id
        }
    });
}

export async function deleteTestQuery({ name }: { name: string }) {
    await prisma.step.deleteMany({
        where: {
            testId: name
        }
    });

    return await prisma.test.delete({
        where: {
            name
        }
    });
}

export async function getLastStepIdQuery() {
    return (await prisma.step.findFirst({
        orderBy: {
            id: 'desc'
        }
    }))?.id;
}