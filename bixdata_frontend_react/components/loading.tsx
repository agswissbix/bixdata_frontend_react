import ScaleLoader from "react-spinners/ScaleLoader";
export default function LoadingComp() {
    return(
        <div className={"w-full h-full flex justify-center items-center"}>
            <ScaleLoader color={"#6e857e"} size={50} />
        </div>
    )
}