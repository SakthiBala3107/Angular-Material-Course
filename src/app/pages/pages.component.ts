import { Component, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { filter, map } from 'rxjs';
import { ThemeService } from '../services/theme.service';
import { FormsModule } from '@angular/forms';
import { LoaderService } from '../services/loader.service';
import {
  MatButtonToggleGroup,
  MatButtonToggleModule,
} from '@angular/material/button-toggle';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatGridListModule } from '@angular/material/grid-list';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pages',
  imports: [
    RouterLink,
    RouterOutlet,
    FormsModule,
    MatRadioButton,
    MatRadioGroup,
    MatSidenavModule,
    MatButtonToggleGroup,
    MatButtonToggleModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    MatGridListModule,
    CommonModule,
  ],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.scss',
})
export class PagesComponent {
  breadcrumb = 'Dashboard'; // default fallback
  selectedColor: 'red' | 'green' | 'blue' = 'green';
  selectedMode: 'light' | 'dark' = 'light';
  isShowSpinner: boolean = false;
  isShowProgressbar: boolean = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private title: Title,
    public themeService: ThemeService,
    public loaderService: LoaderService,
  ) {
    // this.breakpointObserver
    //   .observe([Breakpoints.Small, Breakpoints.XSmall])
    //   .subscribe((state) => {
    //     console.log('RAW STATE:', state);
    //   });

    // this.breakpointObserver
    //   .observe([Breakpoints.Small, Breakpoints.XSmall])
    //   .pipe(map((state) => (state.matches ? 1 : 2)))
    //   .subscribe((cols) => {
    //     console.log('TRANSFORMED VALUE:', cols);
    //   });

    //
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const child = this.getChild(this.route);
        child.data.subscribe((data) => {
          this.breadcrumb = data['breadcrumb'] || 'Dashboard';
          this.title.setTitle(this.breadcrumb);
        });
      });
    this.selectedColor = themeService.color();
    this.selectedMode = themeService.mode();
  }

  private breakpointObserver = inject(BreakpointObserver);

  readonly col$ = this.breakpointObserver
    .observe([Breakpoints.Small, Breakpoints.XSmall, Breakpoints.Medium])
    .pipe(map((state) => (state.matches ? 1 : 2)));

  getChild(route: ActivatedRoute): ActivatedRoute {
    if (route.firstChild) {
      return this.getChild(route.firstChild);
    }
    return route;
  }
}
