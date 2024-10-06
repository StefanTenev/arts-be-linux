import userRepository from "../../../database/entities/users/userRepository";

const getTokenVersion = async (userId: string) => {
    const existingUser = await userRepository().findOne({
        where: { id: userId }
    })

    if(existingUser){
        return existingUser.tokenVersion
    }
    return null
}

export default getTokenVersion