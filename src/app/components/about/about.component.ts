import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  AsyncSubject,
  BehaviorSubject,
  Observable,
  ReplaySubject,
  Subject,
  concatMap,
  delay,
  flatMap,
  from,
  fromEvent,
  interval,
  map,
  mergeMap,
  of,
  switchMap,
  take,
  tap,
} from 'rxjs';

interface IProduct {
  name: string;
  price: number;
  category: string;
}
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements AfterViewInit, OnInit {
  products$ = from<IProduct[]>([
    { name: 'p1', price: 100, category: 'cat1' },
    { name: 'p2', price: 200, category: 'cat2' },
    { name: 'p3', price: 300, category: 'cat3' },
    { name: 'p4', price: 400, category: 'cat1' },
    { name: 'p5', price: 500, category: 'cat2' },
    { name: 'p6', price: 600, category: 'cat3' },
    { name: 'p7', price: 700, category: 'cat1' },
    { name: 'p8', price: 800, category: 'cat2' },
    { name: 'p9', price: 900, category: 'cat3' },
    { name: 'p10', price: 1000, category: 'cat1' },
    { name: 'p11', price: 1100, category: 'cat2' },
    { name: 'p12', price: 1200, category: 'cat3' },
    { name: 'p13', price: 1300, category: 'cat1' },
    { name: 'p14', price: 1400, category: 'cat2' },
    { name: 'p15', price: 1500, category: 'cat3' },
    { name: 'p16', price: 1600, category: 'cat1' },
  ]).pipe(
    // take(3),
    mergeMap((data) => of(data).pipe(delay(1000)))
    // delay(1000),
  );
  // test() {
  //   this.products$.subscribe((data) => {
  //     console.log(data);
  //   });
  // }
  ngOnInit() {
    //#region observable
    // this.test();
    // let x = 5;
    // let observable = new Observable((observer) => {
    //   observer.next(x++);
    //   observer.complete();
    // });
    // const categories = of( ['cat1', 'cat2', 'cat3'] );
    //convert to subject
    // const categories = new Subject<string>();
    // const products = of<IProduct[]>([
    //   { name: 'p1', price: 100, category: 'cat1' },
    //   { name: 'p2', price: 200, category: 'cat2' },
    //   { name: 'p3', price: 300, category: 'cat3' },
    //   { name: 'p4', price: 400, category: 'cat1' },
    //   { name: 'p5', price: 500, category: 'cat2' },
    //   { name: 'p6', price: 600, category: 'cat3' },
    //   { name: 'p7', price: 700, category: 'cat1' },
    //   { name: 'p8', price: 800, category: 'cat2' },
    //   { name: 'p9', price: 900, category: 'cat3' },
    //   { name: 'p10', price: 1000, category: 'cat1' },
    //   { name: 'p11', price: 1100, category: 'cat2' },
    //   { name: 'p12', price: 1200, category: 'cat3' },
    //   { name: 'p13', price: 1300, category: 'cat1' },
    //   { name: 'p14', price: 1400, category: 'cat2' },
    //   { name: 'p15', price: 1500, category: 'cat3' },
    //   { name: 'p16', price: 1600, category: 'cat1' },
    // ]);
    // let prods = categories
    //   .pipe(
    //     switchMap((category, i) =>
    //       products.pipe(map((p) => p.map((p) => p.name)))
    //     )
    //   )
    //   .subscribe((data) => {
    //     console.log(data);
    //   });
    // categories.next('cat1');
    // categories.next('cat2');
    // categories.next('cat3');
    // let observable = new AsyncSubject();
    // observable.next(x++);
    // observable.next(x++);
    // // observable.closed = true;
    // observable.next(8880);
    // observable.complete();
    // observable.subscribe((data) => {
    //   console.log(data);
    // });
    // observable.subscribe((data) => {
    //   console.log(data);
    // });
    // let sub = observable.subscribe((data) => {
    //   console.log(data);
    // });
    // let counter = interval(5);
    // counter.subscribe((data) => {
    //   console.log(data);
    // });
    // const promise = new Promise<number>((resolve, reject) => {
    //   console.log('Promise is called');
    //   setTimeout(() => {
    //     resolve(10);
    //   }, 1000);
    // });
    // promise.then((data) => {
    //   console.log(data);
    // });
    //#endregion
  }

  @ViewChild('createNewInputBtn')
  createNewInputBtn!: ElementRef<HTMLButtonElement>;

  createNewInputBtn$!: Observable<Event>;

  createNewInput() {
    const input = document.createElement('input');
    input.value = 'New Input';
    const div = document.getElementById('container');
    div?.appendChild(input);
    div?.appendChild(document.createElement('br'));
    input.focus();
  }
  ngAfterViewInit(): void {
    this.createNewInputBtn$ = fromEvent(
      this.createNewInputBtn.nativeElement,
      'click'
    ); // convert event to observable

    // subscribe to observable
    this.createNewInputBtn$.subscribe((event) => {
      console.log(event);
      this.createNewInput();
    });
  }
}
