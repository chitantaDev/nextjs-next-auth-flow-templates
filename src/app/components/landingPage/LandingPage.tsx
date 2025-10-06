import './LandingPage.css';
import Link from "next/link";

export default function LandingPage(){

   return (
      <div className="landing">
         <section className="hero">
            <div className="container">
               <h1>Verträge erstellen.<br />Einfach und effizient.</h1>
               <p className="subtitle">
                  Professionelle Vertragserstellung in wenigen Minuten.
                  Rechtssicher, individuell anpassbar und sofort einsatzbereit.
               </p>
               <div className="cta-buttons">
                  <Link className="btn btn-primary" href={"/contract"}>Vertrag erstellen</Link>
                  <button className="btn btn-secondary">Mehr erfahren</button>
               </div>
            </div>
         </section>

         <section className="features">
            <div className="container">
               <div className="features-grid">
                  <div className="feature">
                     <div className="feature-icon">⚡</div>
                     <h3>Schnell</h3>
                     <p>Verträge in wenigen Minuten erstellen und anpassen</p>
                  </div>

                  <div className="feature">
                     <div className="feature-icon">🛡️</div>
                     <h3>Rechtssicher</h3>
                     <p>Professionelle Vorlagen nach aktuellen rechtlichen Standards</p>
                  </div>

                  <div className="feature">
                     <div className="feature-icon">📄</div>
                     <h3>Individuell</h3>
                     <p>Vollständig anpassbare Vertragsvorlagen für jeden Bedarf</p>
                  </div>
               </div>
            </div>
         </section>
      </div>
   );
};