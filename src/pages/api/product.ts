import { withOGImage } from 'next-api-og-image';

enum QueryEnum {
  'logo',
  'siteName',
  'description',
  'theme',
  'templateTitle',
  'logoWidth',
  'logoHeight',
  'banner',
}

export default withOGImage<'query', keyof typeof QueryEnum>({
  template: {
    html: async ({
      siteName,
      description,
      logo,
      theme,
      templateTitle,
      logoWidth,
      logoHeight,
      banner,
    }) => {
      const query = {
        siteName: siteName ?? 'Site Name',
        description: description ?? 'Description',
        logo: logo ?? 'https://www.ndt-vn.com/logo.png',
        theme: theme ?? 'light',
        templateTitle,
        logoWidth: logoWidth ?? '100',
        logoHeight,
        banner,
      };

      return `
        <html>
          <head>
            ${getStyle(query)}
          </head>
          <body>
            <div class="container">
               <div>${banner ? `<img src="${banner}" />` : ''}</div>
            </div>
          </body>
        </html>
      `;
    },
  },
  dev: {
    inspectHtml: true,
  },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getStyle = (query: Record<keyof typeof QueryEnum, string | string[]>) => `
<style>
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  @font-face {
    font-family: 'Gilroy';
    src: url('/fonts/GilroyRegular.woff2');
    font-display: fallback;
  }
  @font-face {
    font-family: 'Gilroy';
    src: url('/fonts/GilroyMedium.woff2');
    font-weight: 500;
    font-display: fallback;
  }
  @font-face {
    font-family: 'Gilroy';
    src: url('/fonts/GilroySemiBold.woff2');
    font-weight: 600;
    font-display: fallback;
  }
  @font-face {
    font-family: 'Gilroy';
    src: url('/fonts/GilroyBold.woff2');
    font-weight: 700;
    font-display: fallback;
  }

  body {
    font-family: 'Gilroy', sans-serif;
  }

  .container {
    width: 100vw;
    height: 100vh;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background: ${query.theme === 'dark' ? '#222' : '#fff'};
    color: ${query.theme === 'dark' ? 'white' : 'black'};

    text-align: center;
    padding: 4rem 3rem;
  }

  h1 {
    font-size: 1.5rem;
    font-size: 3.5rem;
    line-height: 1.1;
    margin-top: 1.5rem;
  }

  h3 {
    margin-top: 0.5rem;
    color: ${query.theme === 'dark' ? '#E5E7EB' : '#374151'};
    font-size: 1.5rem;
  }

  .gradient {
    background-image: linear-gradient(to top right, #b9131a, #ff5050);
    color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
  }
  
  .split {
    display: flex;
    gap: 1rem;
    width: 100%;
    height: 100%;
  }
  .left {
    text-align: left;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }
  .link {
    font-weight: 400;
  }
  .title {
    font-weight: 500;
    font-size: 3rem;
    line-height: 1.3;
    margin-top: 1rem;
  }
  .social {
    display: flex;
    margin-top: auto;
    gap: 1.4rem;
    align-items: center;
  }
  .social_img {
    width: 80px;
    border-radius: 100%;
  }
  .name {
    font-weight: 700;
    font-size: 1.6rem;
  }
  .twitter {
    font-size: 1.3rem;
    margin-top: 0.1rem;
    color: #F3F4F6;
  }
  .right img {
    height: auto;
    max-width: 54vw;
    display: block;
  }
</style>
`;
