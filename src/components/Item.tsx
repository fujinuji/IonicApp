import {Flight} from "./Flight";
import React from "react";
import {IonItem, IonLabel} from "@ionic/react";

interface FlightExt extends Flight {
    onEdit: (id?: string) => void;
}

const Item: React.FC<FlightExt> = ({id, departureTown, arrivalTown, departureTime, arrivalTime, onEdit}) => {
    return (
        <IonItem onClick={() => onEdit(id)}>
            <IonLabel>
                {departureTown}
            </IonLabel>
            <IonLabel>
                {arrivalTown}
            </IonLabel>
            <IonLabel>
                {departureTime}
            </IonLabel>
            <IonLabel>
                {arrivalTime}
            </IonLabel>
        </IonItem>
    );
};

export default Item;