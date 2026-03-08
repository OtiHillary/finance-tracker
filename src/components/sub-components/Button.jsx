export default function Button({onClickFn, textValue, type="default", className}){
    const color = (type=="cancel")? "red" : "teal"

    return (
        <button
            onClick={onClickFn}
            className={`bg-${ color }-500 w-fit text-white px-6 py-2 mx-auto rounded-lg hover:bg-${color}-600 ${className}`}
        >
            {textValue}
        </button>
    )
}