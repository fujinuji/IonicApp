import {RouteComponentProps} from "react-router";
import React, {useContext} from "react";
import {
    IonPage,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonContent,
    IonLoading,
    IonList,
    IonFab,
    IonFabButton,
    IonIcon
} from "@ionic/react";
import Item from "./Item"
import {ItemContext} from "./ItemProvider";
import {add} from "ionicons/icons";

const ItemList: React.FC<RouteComponentProps> = ({history}) => {
    const {items, fetching, fetchingError} = useContext(ItemContext);

    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Flights</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <IonLoading isOpen={fetching} message={"Getting flights"}/>
                {
                    items && (
                        <IonList>
                            {items.map(({id, departureTown, arrivalTown, departureTime, arrivalTime}) =>
                                <Item key={id} id={id} departureTown={departureTown}
                                      arrivalTown={arrivalTown}
                                      departureTime={departureTime}
                                      arrivalTime={arrivalTime}
                                      onEdit={id => history.push(`/item/${id}`)}
                                />)}
                        </IonList>
                    )
                }
                {
                    fetchingError && (
                        <div>{fetchingError.message || 'Failed to fetch flights'}</div>
                    )
                }
                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton onClick={() => history.push('/item')}>
                        <IonIcon icon={add} />
                    </IonFabButton>
                </IonFab>
            </IonContent>
        </IonPage>
    )
};

export default ItemList;