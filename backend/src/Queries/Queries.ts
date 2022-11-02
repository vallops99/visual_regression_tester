import { Prisma, PrismaClient } from "@prisma/client";
import { Test } from "src/utils";

export const prisma = new PrismaClient();

export async function getTesterQuery() {
    return await prisma.tester.findFirst();
}

export async function getTestsQuery(testerId: number, filteringOptions?: { showable?: boolean, notifiable?: boolean }) {
    const whereClause = { where: {
        testerId
    }};

    if (filteringOptions?.showable) {
        Object.assign(
            whereClause.where,
            {
                OR: [{
                    done: true
                }, {
                    pending: true
                }]
            }
        );
    }

    if (filteringOptions?.notifiable) {
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
			steps: true
		},

        orderBy: [
            {
                orderNumber: 'asc'
            }
        ]
    })
}

export async function getTestQuery(testerId: number, name: string) {
    return await prisma.test.findFirst({
        where: {
            AND: [
                { name },
                { testerId },
            ],
        },
        include: {
            steps: true
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
            },
            select: {
                name: true
            }
        }));
    }

    return await Promise.all(arrayOfPromises);
}