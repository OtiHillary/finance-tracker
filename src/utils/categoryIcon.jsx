import { Bus, Clapperboard, HomeIcon, House, Salad, Toolbox } from "lucide-react";

export const getCategoryIcon = (category) => {
    switch (category) {
        case "Food":
        return <div className=" bg-amber-100 rounded-xl font-thin me-2 text-amber-500 p-3.5">
                    <Salad size={15} className="my-auto"/>
                </div>

        case "Housing":
        return <div className=" bg-purple-100 rounded-xl font-thin me-2 text-purple-500 p-3.5">
                    <House size={15} className="my-auto"/>
                </div>

        case "Transport":
        return <div className=" bg-blue-100 rounded-xl font-thin me-2 text-blue-500 p-3.5">
                    <Bus size={15} className="my-auto"/>
                </div>

        case "Entertainment":
        return <div className=" bg-indigo-100 rounded-xl font-thin me-2 text-indigo-500 p-3.5">
                    <Clapperboard size={15} className="my-auto"/>
                </div>

        case "Utilities":
        return <div className=" bg-green-100 rounded-xl font-thin me-2 text-green-500 p-3.5">
                    <Toolbox size={15} className="my-auto"/>
                </div>

        default:
        return <HomeIcon size={15} className="my-auto font-thin me-2 bg-gray-100 text-gray-500 rounded-xl"/>;
    }
};