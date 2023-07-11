import ContractEvent from "./ContractEvent";

type Status = {
    newStatus: number
    previousStatus:number
}

type StatusEvent = ContractEvent<Status>;

export default StatusEvent;