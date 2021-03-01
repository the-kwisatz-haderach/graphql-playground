import React, { ReactElement } from 'react'

interface Props {
  lat: number
  lng: number
  zoom: number
}

export default function Locator({ lat, lng, zoom }: Props): ReactElement {
  return (
    <div className="container">
      <div className="metric">
        <span className="metric-label">Long:</span>
        {lng}
      </div>
      <div className="metric">
        <span className="metric-label">Lat:</span>
        {lat}
      </div>
      <div className="metric">
        <span className="metric-label">Zoom:</span>
        {zoom}
      </div>
      <style jsx>{`
        .container {
          width: 100%;
          height: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: rgba(0, 0, 0, 0.7);
          color: white;
          border-radius: 10px;
        }
        .metric {
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
          margin-right: 20px;
          width: 120px;
          height: 100%;
        }
        .metric:last-child {
          margin-right: 0;
        }
        .metric-label {
          font-weight: bold;
          margin-right: 5px;
        }
        .metric:not(:first-child)::before {
          content: '';
          display: block;
          width: 1px;
          height: calc(100% / 2);
          background-color: rgba(255, 255, 255, 0.3);
          margin-right: 15px;
        }
      `}</style>
    </div>
  )
}
