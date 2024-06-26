import OrbitingCircles from "@/components/magicui/orbiting-circles";

export function OrbitingCirclesDemo() {
  return (
    <div className="relative flex h-[500px] w-full max-w-[32rem] items-center justify-center overflow-hidden rounded-lg shadow- bg-background">
      <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent ">
        Citas
      </span>

      {/* Inner Circles */}
      <OrbitingCircles
        className="h-[30px] w-[30px] border-none bg-transparent"
        duration={20}
        delay={20}
        radius={80}
      >
        <Icons.whatsapp width={80} height={80} />
      </OrbitingCircles>
      <OrbitingCircles
        className="h-[30px] w-[30px] border-none bg-transparent"
        duration={20}
        delay={10}
        radius={80}
      >
        <Icons.notion />
      </OrbitingCircles>

      {/* Outer Circles (reverse) */}
      <OrbitingCircles
        className="h-[50px] w-[50px] border-none bg-transparent"
        radius={190}
        duration={20}
        reverse
      >
        <Icons.googleDrive />
      </OrbitingCircles>
      <OrbitingCircles
        className="h-[50px] w-[50px] border-none bg-transparent"
        radius={190}
        duration={20}
        delay={20}
        reverse
      >
        <Icons.gitHub />
      </OrbitingCircles>
    </div>
  );
}

const Icons = {
  gitHub: () => (
    <svg
      width="90"
      height="90"
      viewBox="0 0 128 128"
      aria-hidden="true"
      role="img"
      className="iconify iconify--noto"
      preserveAspectRatio="xMidYMid meet"
      fill="#000000"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          fill="#ffffff"
          d="M43.22 32.72l.8 62.85l41.77-.27l-.8-64.87z"
        ></path>
        <path
          fill="#d80d1a"
          d="M42.68 37.74l10.14-5.86l23.44.57l-33.71 23.1z"
        ></path>
        <path
          fill="#1d86fa"
          d="M43.22 67.23l42.3-28.87l-.27 19.34l-42.17 29.41z"
        ></path>
        <path
          fill="#d80d1a"
          d="M49.93 95.3l35.46-25.11l-.54 18.53l-13.3 9.54z"
        ></path>
        <path
          fill="#a1d2d6"
          d="M40.53 32.45l.81 64.06l3.89-1.48l-.8-64.06z"
        ></path>
        <path
          fill="#a1d2d6"
          d="M83.24 31.37l.4 63.93l3.87-.44L87 31.24z"
        ></path>
        <path
          d="M40.05 33.09c.64.71 45.97.16 46.76-.24c.79-.4 4.81-3.73 4.5-9.05c-.31-5.25-3.94-6.91-3.94-6.91s-.7-5.26-6.75-9.29c-4.29-2.86-9.85-3.69-16.83-3.63c-7.7.07-14.93.54-19.53 5.14c-4.42 4.42-4.6 8.73-4.6 8.73s-3.91 1.2-3.91 7.08c-.01 5.8 4.3 8.17 4.3 8.17z"
          fill="#c8c8c8"
        ></path>
        <path
          d="M40.76 94.46c-.66.55-.79 3.97-.79 3.97s-3.71 2-3.18 6.35c.48 3.89 3.73 5.4 3.73 5.4s1.52 6.58 6.59 10.16c5.4 3.81 10.72 3.97 18.34 3.97c8.26 0 13.89-.64 18.34-4.84c5.1-4.83 5.48-9.84 5.48-9.84s2.94-1.75 2.86-5.72c-.08-3.97-3.33-5.48-3.33-5.48s-.68-3.17-1.27-3.97c-.3-.41-12.16-.3-23.82-.24c-11.25.05-22.44-.19-22.95.24z"
          fill="#c8c8c8"
        ></path>
        <path
          d="M61.57 120.42c-.08 1.59 8.33 1.55 14.53.16c7.07-1.59 9.37-7.62 8.97-8.1c-.4-.48-7.54-.32-7.94.08c-.4.4-2.22 4.13-5.32 5.4c-3.1 1.27-10.18 1.25-10.24 2.46z"
          fill="#858585"
        ></path>
        <path
          d="M37.04 105.83l54.95-.25s-.18 1.16-.93 2.29c-.73 1.09-1.78 1.75-1.78 1.75l-48.72.57s-1.46-.79-2.09-1.57c-1.39-1.72-1.43-2.79-1.43-2.79z"
          fill="#858585"
        ></path>
        <path
          d="M36.8 103.1l55.14-.71s-.18-1.45-1.16-2.54c-.82-.92-1.98-1.43-1.98-1.43l-49.54.48s-1 .74-1.59 1.59c-.71 1.03-.87 2.61-.87 2.61z"
          fill="#e1e0e0"
        ></path>
        <path
          d="M35.94 22.86s11.02-2.16 27.14-2.4c16.12-.24 27.73.71 27.73.71s-.57-1.9-1.45-2.85s-1.98-1.43-1.98-1.43s-15.11-.55-24.25-.63c-11.04-.09-23.47 1.58-23.47 1.58s-1.33.38-2.23 1.55c-1.28 1.65-1.49 3.47-1.49 3.47z"
          fill="#e1e0e0"
        ></path>
        <path
          d="M35.76 25.96s8.58-1.68 27.71-1.92s27.83 1.15 27.83 1.15s.08 1.16-.3 2.27c-.42 1.24-1.08 2.06-1.08 2.06s-16.45-1.1-26.45-1.02s-26.32 1.66-26.32 1.66s-.69-1.19-.93-1.9c-.23-.74-.46-2.3-.46-2.3z"
          fill="#858585"
        ></path>
        <path
          d="M60.56 19.45c0 .85-5.63 1.35-11.61 1.71c-3.35.2-9.26 1.85-9.26-.36s2.14-2.63 9.4-2.78s11.47.29 11.47 1.43z"
          fill="#ffffff"
        ></path>
        <path
          d="M60.99 6.28c.19.54-2.85 1.57-5.2 4.06c-1.66 1.76-2.21 3.42-3.35 3.85s-7.26 1-7.34-.28c-.1-1.78 1.18-4.6 4.2-6.27c4.78-2.65 11.33-2.36 11.69-1.36z"
          fill="#ffffff"
        ></path>
      </g>
    </svg>
  ),
  notion: () => (
    <svg
      width="60"
      height="60"
      viewBox="0 0 36 36"
      aria-hidden="true"
      role="img"
      class="iconify iconify--twemoji"
      preserveAspectRatio="xMidYMid meet"
      fill="#000000"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          fill="#DD2E44"
          d="M16.806 10.675c-.92-2.047-2.003-4.066-3.026-6.26c-.028-.068-.051-.138-.082-.206c-.064-.142-.137-.277-.208-.413l-.052-.111l-.002.003C11.798.698 8.343-.674 5.46.621C2.414 1.988 1.164 5.813 2.67 9.163c1.505 3.351 5.194 4.957 8.24 3.589c.106-.047.205-.105.306-.159c1.935.438 1.994 1.877 1.994 1.877s4.618-1.521 3.596-3.795zM4.876 8.173c-.958-2.133-.252-4.527 1.575-5.347c1.826-.822 4.084.242 5.042 2.374c.958 2.132.253 4.526-1.573 5.346c-1.828.821-4.087-.241-5.044-2.373z"
        ></path>
        <path
          fill="#99AAB5"
          d="M26.978 34.868c1.163-.657 2.187-2.474 1.529-3.638L16.754 10.559c-1.103.496-2.938 2.313-3.544 3.912l13.768 20.397z"
        ></path>
        <path
          fill="#DD2E44"
          d="M30.54.62c-2.882-1.295-6.338.077-7.976 3.067l-.003-.003l-.053.112c-.071.135-.145.27-.208.412c-.03.068-.053.137-.081.206c-1.023 2.194-2.107 4.213-3.026 6.26c-1.021 2.274 3.597 3.796 3.597 3.796s.059-1.439 1.993-1.877c.102.054.2.111.307.159c3.045 1.368 6.733-.238 8.24-3.589c1.505-3.35.255-7.175-2.79-8.543zm.584 7.553c-.959 2.132-3.216 3.194-5.044 2.373c-1.826-.82-2.531-3.214-1.572-5.346c.956-2.132 3.214-3.195 5.041-2.374c1.827.82 2.532 3.214 1.575 5.347z"
        ></path>
        <path
          fill="#CCD6DD"
          d="M9.022 34.868c-1.163-.657-2.187-2.474-1.529-3.638l11.753-20.671c1.103.496 2.938 2.313 3.544 3.912L9.022 34.868z"
        ></path>
        <path
          fill="#99AAB5"
          d="M19.562 17.396a1.563 1.563 0 1 1-3.126-.002a1.563 1.563 0 0 1 3.126.002z"
        ></path>
      </g>
    </svg>
  ),
  openai: () => (
    <svg
      width="70"
      height="70"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
    </svg>
  ),
  googleDrive: () => (
    <svg
      height="100px"
      width="100px"
      version="1.1"
      id="Layer_1"
      viewBox="0 0 512.001 512.001"
      fill="#000000"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          style={{ fill: "#B8C8D9" }}
          d="M428.83,5.118H83.171c-27.668,0-50.176,22.508-50.176,50.176v66.902c0,9.239,7.492,16.725,16.725,16.725h412.562c9.234,0,16.725-7.486,16.725-16.725V55.295C479.007,27.625,456.499,5.118,428.83,5.118z M150.073,72.02c-9.237,0-16.725-7.489-16.725-16.725s7.489-16.725,16.725-16.725c9.237,0,16.725,7.489,16.725,16.725S159.309,72.02,150.073,72.02z M361.928,72.02c-9.237,0-16.725-7.489-16.725-16.725s7.489-16.725,16.725-16.725c9.237,0,16.725,7.489,16.725,16.725S371.165,72.02,361.928,72.02z"
        ></path>
        <path
          style={{ fill: "#0088E0" }}
          d="M461.824,506.882H50.177c-14.776,0-28.725-6.468-38.286-17.749c-9.549-11.27-13.632-26.101-11.205-40.681l26.733-159.001L2.299,165.48c-2.962-14.788,0.827-29.972,10.399-41.645s23.706-18.365,38.798-18.365h409.011c15.092,0,29.226,6.691,38.798,18.365c9.571,11.673,13.36,26.858,10.399,41.645l-25.121,123.971l26.733,159.001c2.429,14.58-1.655,29.411-11.205,40.681C490.548,500.414,476.6,506.882,461.824,506.882z"
        ></path>
        <path
          style={{ fill: "#0088E0" }}
          d="M500.11,489.133c9.549-11.27,13.633-26.101,11.205-40.681l-26.733-159.001H27.419L0.686,448.453c-2.429,14.58,1.655,29.411,11.205,40.681c9.56,11.281,23.509,17.749,38.286,17.749h411.647C476.6,506.882,490.548,500.414,500.11,489.133z"
        ></path>
        <path
          style={{ fill: "#CFDBE6" }}
          d="M368.329,173.646c-6.247-2.587-13.444-1.157-18.227,3.626l-50.176,50.176c-6.532,6.532-6.532,17.121,0,23.653c6.531,6.532,17.121,6.532,23.653,0l21.625-21.624v160.326c0,9.237,7.489,16.725,16.725,16.725c9.237,0,16.725-7.489,16.725-16.725V189.099C378.654,182.334,374.58,176.234,368.329,173.646z"
        ></path>
        <path
          style={{ fill: "#E6F3FF" }}
          d="M345.203,289.451v100.353c0,9.237,7.489,16.725,16.725,16.725c9.237,0,16.725-7.489,16.725-16.725V289.451H345.203z"
        ></path>
        <path
          style={{ fill: "#CFDBE6" }}
          d="M267.151,239.275c0-36.89-30.012-66.902-66.902-66.902s-66.902,30.012-66.902,66.902c0,9.237,7.489,16.725,16.725,16.725c9.237,0,16.725-7.489,16.725-16.725c0-18.445,15.006-33.451,33.451-33.451S233.7,220.83,233.7,239.275c0,18.445-15.006,33.451-33.451,33.451c-9.237,0-16.725,7.489-16.725,16.725c0,9.237,7.489,16.725,16.725,16.725c18.445,0,33.451,15.006,33.451,33.451c0,18.445-15.006,33.451-33.451,33.451s-33.451-15.006-33.451-33.451c0-9.237-7.489-16.725-16.725-16.725c-9.237,0-16.725,7.489-16.725,16.725c0,36.89,30.012,66.902,66.902,66.902s66.902-30.012,66.902-66.902c0-19.968-8.804-37.908-22.721-50.176C258.346,277.183,267.151,259.242,267.151,239.275z"
        ></path>
        <path
          style={{ fill: "#E6F3FF" }}
          d="M200.249,306.177c18.445,0,33.451,15.006,33.451,33.451c0,18.445-15.006,33.451-33.451,33.451s-33.451-15.006-33.451-33.451c0-9.237-7.489-16.725-16.725-16.725c-9.237,0-16.725,7.489-16.725,16.725c0,36.89,30.012,66.902,66.902,66.902s66.902-30.012,66.902-66.902c0-19.968-8.804-37.908-22.721-50.176h-60.906C183.523,298.688,191.012,306.177,200.249,306.177z"
        ></path>
      </g>
    </svg>
  ),
  whatsapp: ({ width, height }) => (
    <svg
      width={width}
      height={height}
      viewBox="0 0 175.216 175.552"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id="b"
          x1="85.915"
          x2="86.535"
          y1="32.567"
          y2="137.092"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#57d163" />
          <stop offset="1" stopColor="#23b33a" />
        </linearGradient>
        <filter
          id="a"
          width="1.115"
          height="1.114"
          x="-.057"
          y="-.057"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur stdDeviation="3.531" />
        </filter>
      </defs>
      <path
        d="m54.532 138.45 2.235 1.324c9.387 5.571 20.15 8.518 31.126 8.523h.023c33.707 0 61.139-27.426 61.153-61.135.006-16.335-6.349-31.696-17.895-43.251A60.75 60.75 0 0 0 87.94 25.983c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.312-6.179 22.558zm-40.811 23.544L24.16 123.88c-6.438-11.154-9.825-23.808-9.821-36.772.017-40.556 33.021-73.55 73.578-73.55 19.681.01 38.154 7.669 52.047 21.572s21.537 32.383 21.53 52.037c-.018 40.553-33.027 73.553-73.578 73.553h-.032c-12.313-.005-24.412-3.094-35.159-8.954zm0 0"
        fill="#b3b3b3"
        filter="url(#a)"
      />
      <path
        d="m12.966 161.238 10.439-38.114a73.42 73.42 0 0 1-9.821-36.772c.017-40.556 33.021-73.55 73.578-73.55 19.681.01 38.154 7.669 52.047 21.572s21.537 32.383 21.53 52.037c-.018 40.553-33.027 73.553-73.578 73.553h-.032c-12.313-.005-24.412-3.094-35.159-8.954z"
        fill="#ffffff"
      />
      <path
        d="M87.184 25.227c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.312-6.179 22.559 23.146-6.069 2.235 1.324c9.387 5.571 20.15 8.518 31.126 8.524h.023c33.707 0 61.14-27.426 61.153-61.135a60.75 60.75 0 0 0-17.895-43.251 60.75 60.75 0 0 0-43.235-17.929z"
        fill="url(#linearGradient1780)"
      />
      <path
        d="M87.184 25.227c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.313-6.179 22.558 23.146-6.069 2.235 1.324c9.387 5.571 20.15 8.517 31.126 8.523h.023c33.707 0 61.14-27.426 61.153-61.135a60.75 60.75 0 0 0-17.895-43.251 60.75 60.75 0 0 0-43.235-17.928z"
        fill="url(#b)"
      />
      <path
        d="M68.772 55.603c-1.378-3.061-2.828-3.123-4.137-3.176l-3.524-.043c-1.226 0-3.218.46-4.902 2.3s-6.435 6.287-6.435 15.332 6.588 17.785 7.506 19.013 12.718 20.381 31.405 27.75c15.529 6.124 18.689 4.906 22.061 4.6s10.877-4.447 12.408-8.74 1.532-7.971 1.073-8.74-1.685-1.226-3.525-2.146-10.877-5.367-12.562-5.981-2.91-.919-4.137.921-4.746 5.979-5.819 7.206-2.144 1.381-3.984.462-7.76-2.861-14.784-9.124c-5.465-4.873-9.154-10.891-10.228-12.73s-.114-2.835.808-3.751c.825-.824 1.838-2.147 2.759-3.22s1.224-1.84 1.836-3.065.307-2.301-.153-3.22-4.032-10.011-5.666-13.647"
        fill="#ffffff"
        fillRule="evenodd"
      />
    </svg>
  ),
};

export default Icons;
