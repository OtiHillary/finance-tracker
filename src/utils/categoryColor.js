export const getCategoryColor = (category) => {
    switch (category) {
        case "Food":
        return "bg-yellow-100 text-yellow-700";
        case "Housing":
        return "bg-purple-100 text-purple-700";
        case "Transport":
        return "bg-blue-100 text-blue-700";
        case "Entertainment":
        return "bg-pink-100 text-pink-700";
        case "Utilities":
        return "bg-indigo-100 text-indigo-700";
        default:
        return "bg-gray-100 text-gray-700";
    }
};

