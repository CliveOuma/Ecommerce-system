"use client"
import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { useCallback } from "react";
import { IconType } from "react-icons";
queryString

interface CategoryProps{
    label: string;
    icon:IconType;
    selected?: boolean

}


const Category:React.FC<CategoryProps> = ({label, icon:Icon, selected}) => {

    const router = useRouter()
    const params = useSearchParams()

    const handleClick = useCallback(() => {
        if(label === 'All'){
            router.push('/')
        }else {
            let currentQuery = {};

            if(params){
                currentQuery = queryString.parse(params.toString())
            }

            const updatedQuery:any = {
                ...currentQuery,
                category: label
            }
            const url = queryString.stringifyUrl(
                {
                    url: '/',
                    query: updatedQuery
                },
                {
                    skipNull: true
                }
            )

            router.push(url)
        }
    },[label, params, router])



    return ( 
        <div onClick={handleClick} className={`flex items-center justify-center gap-1 border-b-2 text-center transition 
        cursor-pointer hover:text-slate-800 p-2 
        ${selected ? 'border-b-slate-900 text-slate-900' : 'border-transparent text-slate-500'}`}>
            <Icon size={20}/>
            <div className="font-medium text-sm">{label}</div>
        </div>
     );
}
 
export default Category;