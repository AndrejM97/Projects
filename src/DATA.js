import hostingIcon from "./images/benefits/hosting.svg";
import responsiveIcon from "./images/benefits/responsive.svg";
import performanceIcon from "./images/benefits/performance.svg";
import editIcon from "./images/benefits/edit.svg";
import fullymanagedIcon from "./images/benefits/fullymanaged.svg";
import mobilefirstIcon from "./images/benefits/mobilefirst.svg";

import discoveryIcon from "./images/process/discover.svg";
import designIcon from "./images/process/design.svg";
import developIcon from "./images/process/develop.svg";
import testIcon from "./images/process/test.svg";
import publishIcon from "./images/process/publish.svg";

const benefitsData = [
  {
    id: 1,
    imgSrc: hostingIcon,
    imgAlt: "hosting icon",
    title: "Hosting",
    description:
      "Cloud-Hosting und Gebühren sind in jeder monatlichen Zahlung enthalten, sodass Sie stets beruhigt sein können.",
  },
  {
    id: 2,
    imgSrc: responsiveIcon,
    imgAlt: "responsive icon",
    title: "Vollständig responsiv",
    description:
      "Ihre Daten sind stets geschützt durch unsere hochmoderne Sicherheitsinfrastruktur.",
  },
  {
    id: 3,
    imgSrc: performanceIcon,
    imgAlt: "performance icon",
    title: "Leistungsversprechen",
    description:
      "Erreichen Sie eine makellose Google Page Speed-Bewertung und verbessern Sie Ihr Suchranking sowie Ihre Online-Sichtbarkeit.",
  },
  {
    id: 4,
    imgSrc: editIcon,
    imgAlt: "edit icon",
    title: "Unbegrenzte Bearbeitungen",
    description:
      "Genießen Sie die Freiheit, jederzeit unbegrenzt Bearbeitungen vorzunehmen, mit schnell umgesetzten Änderungen am selben Tag",
  },
  {
    id: 5,
    imgSrc: fullymanagedIcon,
    imgAlt: "fully managed icon",
    title: "Vollständig verwaltet",
    description:
      "Wir kümmern uns um alle Aspekte des Website-Managements, damit Sie sich auf Ihr Geschäft konzentrieren können.",
  },
  {
    id: 6,
    imgSrc: mobilefirstIcon,
    imgAlt: "mobile first icon",
    title: "Mobile-First Design",
    description:
      "Wir priorisieren die Entwicklung für mobile Geräte, um von den 60 % des Traffics zu profitieren, die von mobilen Endgeräten stammen.",
  },
];

const processData = [
  {
    id: 1,
    title: "Entdeckung",
    description:
      "Bevor der erste Pixel platziert wird, tauchen wir tief in das Verständnis Ihrer Bedürfnisse, Ziele und Markenidentität ein.",
    imgSrc: discoveryIcon,
    imgAlt: "discovery icon",
  },
  {
    id: 2,
    title: "Design",
    description:
      "Mit den Erkenntnissen aus unserer Entdeckungsphase beginnen wir, ein maßgeschneidertes Design zu entwerfen.",
    imgSrc: designIcon,
    imgAlt: "design icon",
  },
  {
    id: 3,
    title: "Entwicklung",
    description:
      "Mit dem Grundgerüst in der Hand erweckt unser Coding-Zauberer das Design zum Leben und verwandelt es in eine voll funktionsfähige Website.",
    imgSrc: developIcon,
    imgAlt: "develop icon",
  },
  {
    id: 4,
    title: "Testen",
    description:
      "Von der Überprüfung der Responsivität auf verschiedenen Geräten bis zur Validierung von Links und Funktionen inspizieren wir jedes Element im Detail.",
    imgSrc: testIcon,
    imgAlt: "test icon",
  },
  {
    id: 5,
    title: "Veröffentlichung",
    description:
      "Nach umfassenden Tests und Optimierungen wird Ihre Website online gestellt. Sie ist nun für Ihre Besucher weltweit erreichbar und bereit, Ihre Botschaft zu verbreiten.",
    imgSrc: publishIcon,
    imgAlt: "publish icon",
  },
];

// Export both benefitsData and processData
export { benefitsData, processData };
