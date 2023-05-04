import {RequestStatus} from './request.model';
import {filter, Observable} from "rxjs";

export interface DomainEntity<T> {
  domain: T;
  requestStatus: RequestStatus;
}

export const isEntityLoaded = <T extends Partial<{ id: string }> | undefined>(orderId: string, s1: DomainEntity<T | undefined>) => {
  if (s1.requestStatus.status === 'NEW' || s1.requestStatus.status === 'PENDING') {
    return false;
  } else {
    if (s1.requestStatus.status === 'ERROR') {
      return true;
    } else {
      return s1.domain?.id === orderId;
    }
  }
}

export const emitOnlyIfCompleted = (entity: Observable<DomainEntity<any>>): Observable<DomainEntity<any>> => {
  return entity.pipe(
    filter(v => v.requestStatus.status === 'COMPLETED' || v.requestStatus.status === 'ERROR')
  )

}
