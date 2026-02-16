import ContentLoader from "react-content-loader";

const ProductCardSkeleton = (props) => (
  <ContentLoader 
    speed={2}
    width={300}
    height={400}
    viewBox="0 0 300 400"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    {/* Image Placeholder */}
    <rect x="0" y="0" rx="8" ry="8" width="300" height="200" />
    
    {/* Title Placeholder */}
    <rect x="0" y="220" rx="4" ry="4" width="200" height="24" />
    
    {/* Subtitle Placeholder */}
    <rect x="0" y="260" rx="3" ry="3" width="150" height="16" />
    
    {/* Rating Placeholder */}
    <circle cx="20" cy="300" r="12" />
    <rect x="40" y="295" rx="3" ry="3" width="40" height="14" />
    
    {/* Price + Button Placeholder */}
    <rect x="0" y="340" rx="4" ry="4" width="80" height="24" />
    <circle cx="250" cy="350" r="20" />
  </ContentLoader>
);

export default ProductCardSkeleton;