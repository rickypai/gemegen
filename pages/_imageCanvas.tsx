import React from "react";

function DrawOverlay(
  ctx: CanvasRenderingContext2D,
  img: CanvasImageSource,
  width: number,
  height: number
) {
  ctx.drawImage(img, 0, 0);
  ctx.fillStyle = "rgba(255, 255, 255, 0)";
  ctx.fillRect(0, 0, width, height);
}

type ImageCanvasProps = MemeTemplate;

type ImageCanvasState = MemeTemplate;

interface TextBox {
  text: string;
  offsetX: number;
  offsetY: number;
  // TODO: color
}

export interface MemeTemplate {
  name: string;

  imageSrc: string;
  textBoxes: TextBox[];

  // TODO
  width: number;
  height: number;
}

export const DefaultMemeTemplates = [
  {
    name: "MTF",
    width: 720, // TODO: dynamic size from image
    height: 695,
    textBoxes: [
      {
        text: "NYET",
        offsetX: 450,
        offsetY: 175,
      },
      {
        text: "MTF",
        offsetX: 450,
        offsetY: 525,
      },
    ],
    imageSrc: "/2srcf5.jpg",
  },
  {
    name: "FTM",
    width: 720, // TODO: dynamic size from image
    height: 695,
    textBoxes: [
      {
        text: "NYET",
        offsetX: 450,
        offsetY: 175,
      },
      {
        text: "FTM",
        offsetX: 450,
        offsetY: 525,
      },
    ],
    imageSrc: "/3hxd77.png",
  },
  {
    name: "MTFwat",
    width: 720, // TODO: dynamic size from image
    height: 695,
    textBoxes: [
      {
        text: "DA",
        offsetX: 450,
        offsetY: 175,
      },
      {
        text: "wat",
        offsetX: 450,
        offsetY: 525,
      },
    ],
    imageSrc: "/3jauzd.png",
  },
];

export class ImageCanvas extends React.Component<
  ImageCanvasProps,
  ImageCanvasState
> {
  canvasRef: React.MutableRefObject<HTMLCanvasElement>;

  imageRef: React.MutableRefObject<HTMLImageElement>;

  constructor(props: ImageCanvasProps) {
    super(props);

    this.state = { ...props };

    this.canvasRef = React.createRef();
    this.imageRef = React.createRef();
  }

  static getDerivedStateFromProps(props: ImageCanvasProps): any {
    return {
      width: props.width,
      height: props.height,
    };
  }

  componentDidMount(): void {
    this.drawText();
  }

  componentDidUpdate(): void {
    // console.log("ImageCanvas componentDidUpdate");
    // console.log(prevProps);
    // console.log("prevState");
    // console.log(prevState);
    // console.log(snapshot);
    // console.log("this.state");
    // console.log(this.state);

    this.drawText();
  }

  drawText(): void {
    const ctx = this.canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, this.state.width, this.state.height);
    DrawOverlay(
      ctx,
      this.imageRef.current,
      this.state.width,
      this.state.height
    );

    this.state.textBoxes.forEach((ea) => {
      ctx.fillStyle = "black"; // TODO: pick color
      ctx.textBaseline = "middle";
      ctx.font = "50px 'Montserrat'";

      ea.text.split("\n").forEach((line: string, index: number) => {
        ctx.fillText(line, ea.offsetX, ea.offsetY + index * 50);
      });
    });
  }

  render(): JSX.Element {
    return (
      <div>
        <div>
          {this.state.textBoxes.map((value: TextBox, index: number) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={`text-box-control-${index}`}>
              {/* <label className="controls__label" htmlFor="name">Overlay Text</label> */}
              <textarea
                className="controls__input"
                // id="name"
                // type="text"
                defaultValue={value.text}
                onChange={(e) => {
                  const { textBoxes } = this.state;
                  textBoxes[index].text = e.target.value;
                  this.setState({ textBoxes });
                }}
              />
              <input
                className="controls__input"
                // id="name"
                type="number"
                defaultValue={value.offsetX}
                onChange={(e) => {
                  const { textBoxes } = this.state;
                  textBoxes[index].offsetX = parseInt(e.target.value, 10);
                  this.setState({ textBoxes });
                }}
              />
              <input
                className="controls__input"
                // id="name"
                type="number"
                defaultValue={value.offsetY}
                onChange={(e) => {
                  const { textBoxes } = this.state;
                  textBoxes[index].offsetY = parseInt(e.target.value, 10);
                  this.setState({ textBoxes });
                }}
              />
            </div>
          ))}
        </div>
        <div>
          <img
            src={this.state.imageSrc}
            ref={this.imageRef}
            style={{ display: "none" }}
            alt=""
          />
          <canvas
            style={{ display: "block" }}
            width={this.state.width}
            height={this.state.height}
            ref={this.canvasRef}
          />
        </div>
      </div>
    );
  }
}

export default ImageCanvas;
