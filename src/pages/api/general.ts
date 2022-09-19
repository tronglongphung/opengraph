import { withOGImage } from 'next-api-og-image';

export enum GeneralQueryEnum {
  'logo',
  'siteName',
  'description',
  'theme',
  'templateTitle',
  'logoWidth',
  'logoHeight',
}

export default withOGImage<'query', keyof typeof GeneralQueryEnum>({
  template: {
    html: async ({
      siteName,
      description,
      logo,
      theme,
      templateTitle,
      logoWidth,
      logoHeight,
    }) => {
      const query = {
        siteName: siteName ?? 'Site Name',
        description: description ?? 'Description',
        logo:
          logo ??
          'https://ndt-vn-bucket.s3.ap-southeast-1.amazonaws.com/OE_750_Foundry_JPG_4_bcd9972abc.webp',
        theme: theme ?? 'light',
        templateTitle,
        logoWidth: logoWidth ?? '100',
        logoHeight,
      };

      return `
        <html>
          <head>
            ${getStyle(query)}
          </head>
          <body>
            <div class="container">
              <img src="${query.logo}" alt="" />
              ${
                query.templateTitle
                  ? `<h1>${query.templateTitle}</h1>
                  <h3>${query.siteName}</h3>`
                  : `<h1>${query.siteName}</h1>`
              }
              
              <p class="description">${query.description}</p>
            </div>
          </body>
        </html>
      `;
    },
  },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getStyle = (
  query: Record<keyof typeof GeneralQueryEnum, string | string[]>
) => `
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
    font-display: optional;
  }
  @font-face {
    font-family: 'Gilroy';
    src: url('/fonts/GilroyMedium.woff2');
    font-weight: 500;
    font-display: optional;
  }
  @font-face {
    font-family: 'Gilroy';
    src: url('/fonts/GilroySemiBold.woff2');
    font-weight: 600;
    font-display: optional;
  }
  @font-face {
    font-family: 'Gilroy';
    src: url('/fonts/GilroyBold.woff2');
    font-weight: 700;
    font-display: optional;
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
    padding: 0 5rem;
  }

  img {
    width: ${query.logoWidth}px;
    ${query.logoHeight && `height: ${query.logoHeight}px`}
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
  
  .description {
    font-size: 1.8rem;
    line-height: 1.5;
    margin-top: 1rem;
    color: ${query.theme === 'dark' ? '#D1D5DB' : '#1F2937'};
  }
</style>
`;
