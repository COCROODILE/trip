export const getAssetURL = (image) => {
  // new URL(相对路径，当前路径的url)
  return new URL(`../assets/img/${image}`, import.meta.url).href
}