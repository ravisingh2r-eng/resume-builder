# Fonts Directory

Place custom fonts here if needed.

## Currently Using
The application uses Google Fonts API for:
- Inter
- Poppins
- Roboto
- Lato
- Merriweather
- Playfair Display

## Adding Custom Fonts
If you want to add custom fonts:

1. Place `.woff` and `.woff2` files here
2. Add `@font-face` declarations in `css/style.css`
3. Update font family selectors

Example:
```css
@font-face {
    font-family: 'CustomFont';
    src: url('../assets/fonts/CustomFont.woff2') format('woff2'),
         url('../assets/fonts/CustomFont.woff') format('woff');
    font-weight: normal;
    font-style: normal;
}
```
