import { AvailableArea } from "./style";

export default function AuthArea(props){
    return(
        <AvailableArea>
            <div>
                <h1>makers.box</h1>
                <h2>your project starts here</h2>
            </div>
            <span>
                {props.children}
            </span>
        </AvailableArea>
    );
}
