import { User, IActiveProjectLocation } from './user';
import { autoinject } from 'aurelia-framework';

@autoinject
export class GeopositionTools {
    constructor(private user: User) {

    }

    getNearestProject(currentLocation: Position): IActiveProjectLocation | null {
        let projectLocations: IActiveProjectLocation[] = [];
        this.user.projectLocations.forEach((project) => {
            const distance = this.calculateHaversineDistance(currentLocation, project.location);
            if(distance < this.user.locationThreshold) {
                projectLocations.push({ name: project.name, projectLocation: project, distance: distance });
            }
        });

        if(projectLocations.length > 0) {
            projectLocations.sort((a, b) => {
                return a.distance - b.distance;
            });
            return projectLocations[0];
        } else {
            return null;
        }
    }

    private toRad(x: number) {
        return x * Math.PI / 180;
    }

    private calculateHaversineDistance(currentLocation: Position, savedLocation: Position) {
        const R = 6371;
        const dLat = this.toRad(savedLocation.coords.latitude - currentLocation.coords.latitude);
        const dLong = this.toRad(savedLocation.coords.longitude - currentLocation.coords.longitude);

        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                    Math.cos(this.toRad(currentLocation.coords.latitude)) * Math.cos(this.toRad(savedLocation.coords.latitude)) * Math.sin(dLong/2) * Math.sin(dLong/2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        const d = R * c;

        return Math.round(d);
    }

    geopositionToObject(geoposition: Position) {
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
}