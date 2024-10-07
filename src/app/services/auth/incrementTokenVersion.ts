import userRepository from "../../../database/entities/users/userRepository";

const incrementTokenVersion = async (userId: string) => {

    const existingUser = await userRepository().findOne({
        where: { id: userId }
    })

    if(existingUser){
        return await userRepository().increment({id: existingUser.id}, 'tokenVersion', 1)
    }
    return null

}

export default incrementTokenVersion