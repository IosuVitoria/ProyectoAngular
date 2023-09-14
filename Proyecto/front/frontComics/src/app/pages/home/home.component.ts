import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  audioUrl: SafeResourceUrl;
  isAudioPlaying: boolean;

  constructor(private sanitizer: DomSanitizer) {
    this.audioUrl = this.sanitizer.bypassSecurityTrustResourceUrl('../../../assets/Avengers.mp3');
    this.isAudioPlaying = true;
  }

  ngOnInit() {
    const audioElement = <HTMLAudioElement>document.getElementById('audioPlayer');
    audioElement.addEventListener('ended', () => {
      this.isAudioPlaying = false;
    });
  }
}
