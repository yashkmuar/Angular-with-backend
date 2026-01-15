import { inject, Injectable, signal } from '@angular/core';

import { Place } from './place.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private httpClient = inject(HttpClient);
  private userPlaces = signal<Place[]>([]);

  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces() {}

  loadUserPlaces() {}

  addPlaceToUserPlaces(place: Place) {}

  removeUserPlace(place: Place) {}

  private fetchPlaces(url: string, errorMessage:string) {
    this.httpClient.get<{places: Place[]}>(url)
      .pipe(
        map((resData) => resData.places), catchError((error) => {
          console.log(error);
          return throwError(() => new Error(errorMessage));
        }
        )
      )
  }
}
