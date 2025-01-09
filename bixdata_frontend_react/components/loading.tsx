import SyncLoader from "react-spinners/SyncLoader";
export default function LoadingComp() {
    return(
        <div className={"w-full h-full flex justify-center items-center"}>
            <SyncLoader color={"#6e857e"} size={20} />
        </div>
    )
}