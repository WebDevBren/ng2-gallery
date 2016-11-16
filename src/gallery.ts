import { Component, Input, trigger, state, style, transition, animate } from '@angular/core';

@Component({
    selector: 'sparta-gallery',
    templateUrl: 'gallery.html',
    styleUrls: [ 'gallery.scss' ],
    animations: [
        trigger('imageState', [
            transition('* => active', [
                style({ transform: 'translateX(-100%)' }),
                animate('100ms ease-out')
            ]),
            transition('active => *', [
                style({ transform: 'translateX(-100%)' }),
                animate('100ms ease-out')
            ])
        ])
    ]
})
export class GalleryComponent {

    visibleImages: Array<ImageObject>;
    _transform: number = 0;
    _thumbnail_width: number = 300;

    @Input() images: Array<ImageObject>;

    get thumbnailTransform() {
        return 'translate(-'+this._transform+'px)';
    }

    get maximumTransform() {
        return this._thumbnail_width * this.images.length;
    }
    
    get visibleImage() : ImageObject {
        return this.visibleImages[0];
    }

    set visibleImage(imageObject: ImageObject) {
        if( this.visibleImages.findIndex( Img => Img.source === imageObject.source ) == -1 ) {
            this.visibleImages.push( imageObject );
            if( this.visibleImages.length > 1 ) {
                this.visibleImages.shift();
            }
        }
    }

    getImageKey( image: ImageObject ) : number {
        return this.images.findIndex(img => img.source === image.source);
    }

    getImageByKey( key: number ) : ImageObject {
        return this.images[key];
    }

    setVisible( image: ImageObject ) {
        this.visibleImage = image;
    }

    slideLeft() {
        let amountToTransform = this._transform - this._thumbnail_width;
        if( amountToTransform >= 0 ) {
            this._transform = this.maximumTransform;
        } else {
            this._transform = amountToTransform;
        }
    }

    slideRight() {
        let amountToTransform = this._transform + this._thumbnail_width;
        if( amountToTransform >= this.maximumTransform  ) {
            this._transform = 0;
        } else {
            this._transform = amountToTransform;
        }
    }

    slideToImage( image: ImageObject ) {
        let ImgKey = this.getImageKey( image );
        if( ImgKey !== -1 ) {
            this._transform = this._thumbnail_width * (ImgKey + 1)
        }
    }

    isPreviewImage(image : ImageObject) {
        return this.visibleImage.source === image.source;
    }

    constructor() {}

}

export interface ImageObject {
        source: string,
        description: string,
        title?: string
}
