import { User, Property, Comment, Contact } from "@prisma/client";

export type SafeUser = Omit<
User,
'createdAt' | 'updatedAt' | 'emailVerified'
> & {
createdAt: string;
updatedAt: string;
emailVerified: string | null;
}

export type ContactUser = User & {
    properties: Property[]
}

export type PropertyContactType = (Contact & {
    contact: {
        name: string | null,
        firstName: string | null,
        lastName: string | null,
        email: string | null,
        phoneNumber: string | null
    },
    property: {
        title: string | null
    }
})[]

export type PropertyCommentType = (
    Comment & {
        author: {
            name: string | null,
            firstName: string | null,
            lastName: string | null,
            email: string | null,
        },
        property: {
            title: string | null
        }
    }
)[]

export type CommentType = Comment & {
    author: User
}

export type SafeListings = Omit<
    Property,
    'createdAt'
> & {
    createdAt: string;
}