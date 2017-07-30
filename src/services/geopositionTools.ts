import { User, IProjectLocation } from './user';

export class GeopositionTools {

    static getNearestProject(currentLocation: Position, user: User): IProjectLocation | null {
        let projectDistances: { projectLocation: IProjectLocation, distance: number }[] = [];
        user.projectLocations.forEach((project) => {
            const distance = this.calculateHaversineDistance(currentLocation, project.location);
            if(distance < user.locationThreshold) {
                projectDistances.push({ projectLocation: project, distance: distance });
            }
        });

        if(projectDistances.length > 0) {
            projectDistances.sort((a, b) => {
                return a.distance - b.distance;
            });
            return projectDistances[0].projectLocation; //nearest projectLocation
        } else {
            return null;
        }
    }

    private static toRad(x: number) {
        return x * Math.PI / 180;
    }

    private static calculateHaversineDistance(currentLocation: Position, savedLocation: Position) {
        const R = 6371;
        const dLat = this.toRad(savedLocation.coords.latitude - currentLocation.coords.latitude);
        const dLong = this.toRad(savedLocation.coords.longitude - currentLocation.coords.longitude);

        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                    Math.cos(this.toRad(currentLocation.coords.latitude)) * Math.cos(this.toRad(savedLocation.coords.latitude)) * Math.sin(dLong/2) * Math.sin(dLong/2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        const d = R * c;

        return Math.round(d);
    }

    static geopositionToObject(geoposition: Position) {
        return {
            timestamp: geoposition.timestamp,
            coords: {
                accuracy: geoposition.coords.accuracy,
                altitude: geoposition.coords.altitude,
                altitudeAccuracy: geoposition.coords.altitudeAccuracy,
                heading: geoposition.coords.heading,
                latitude: geoposition.coords.latitude,
                longitude: geoposition.coords.longitude,
                speed: geoposition.coords.speed
            }
        }
    }

    static getCurrentLocation(options: any = null): Promise<Position> {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, ({code, message}) =>
                reject(Object.assign(new Error(message), {name: "PositionError", code})),
                options);
        });
};
}