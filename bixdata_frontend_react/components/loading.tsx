import GridLoader from "react-spinners/GridLoader";
export default function LoadingComp() {
    return(
        <div className={"w-full h-full flex justify-center items-center"}>
            <GridLoader color={"#6e857e"} margin={2} />
        </div>
    )
}