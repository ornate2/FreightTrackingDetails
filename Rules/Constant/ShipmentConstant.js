/*Field task list of constant*/
export default class{
    static get mapBaseUrl(){
        return "https://www.google.com/maps/dir/?api=1";
    }
    static get travelMode(){
        return "&travelmode=driving";
    }
    static get origin(){
       return "&origin=";
    }
    static get destination(){
        return "&destination=";
    }
    static get wayPoint(){
        return "&waypoints=";
    }
    static get getTravelMode(){
        return "&travelmode=driving";
    }
}