// import { Repository } from "typeorm"

export const ifExists = async (repository: any , item: any, callback: any) => {

    const findItem = await repository.findOne({
        where: { item }
    })

    if(findItem){
        callback()
    }
}

export const ifNotExists = async (repository: any , item: any, callback: any) => {

    const findItem = await repository.findOne({
        where: { item }
    })

    if(!findItem){
        callback()
    }
}
