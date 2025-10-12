import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
// import { Navigate } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Spartan:wght@100;200;300;400;500;600;700;800;900&display=swap');
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: 'Spartan', sans-serif;
  }
`

const categories = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200",
    title: "SUMMER ANTHOLOGIES",
    cat: "summer",
    description: "A sundress or summer dress is an informal or casual dress intended to be worn in warm weather, typically in a lightweight fabric, most commonly cotton, and usually loose-fitting. It is commonly a bodice style sleeveless dress, typically with a wide neckline and thin shoulder straps, and may be backless"
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=1200",
    title: "WINTER ANTHOLOGIES",
    cat: "winter",
    description: "Often they have a good water resistance consist of multiple layers to protect and insulate against low temperatures. Winter clothes are especially outerwear like coats jackets hats scarves and gloves or mittens earmuffs but also warm underwear like long underwear union suits and socks"
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=1200",
    title: "AUTUMN ANTHOLOGIES",
    cat: "dresses",
    description: "Autumn fashion combines comfort with style, featuring layers, warm tones, and versatile pieces. Perfect for transitional weather, this collection showcases premium fabrics and timeless designs that keep you cozy while looking sophisticated throughout the season"
  },
  {
    id: 4,
    img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1200",
    title: "SPRING ANTHOLOGIES",
    cat: "jackets",
    description: "Spring collections celebrate renewal with light fabrics, fresh colors, and breathable designs. This seasonal anthology features contemporary pieces that embody elegance and comfort, perfect for embracing the warmth and vitality of spring weather"
  }
];

const mobile = (styles) => `
  @media only screen and (max-width: 768px) {
    ${styles}
  }
`;

const Wrapper = styled.div`
  width: 100%;
`;

const SectionContainer = styled.div`
  position: relative;
  height: ${props => props.totalSections * 100}vh;
`;

const Section = styled.div`
  position: sticky;
  top: 0;
  height: 100vh;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  overflow: hidden;
  
  ${mobile(`
    grid-template-columns: 1fr;
    grid-template-rows: 50vh 50vh;
  `)}
`;

const ImagePanel = styled.div`
  height: 100vh;
  background-image: url(${props => props.bgImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  order: ${props => props.order};
  
  ${mobile(`
    height: 50vh;
    order: 1;
  `)}
`;

const ContentPanel = styled.div`
  height: 100vh;
  background-color: ${props => props.bgColor || '#ffffff'};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 60px 80px;
  order: ${props => props.order};
  
  ${mobile(`
    height: 50vh;
    padding: 40px 30px;
    order: 2;
  `)}
`;

const CategoryTitle = styled.h1`
  font-family: 'Spartan', sans-serif;
  font-weight: 500;
  color: #585151d1;
  font-size: 24px;
  margin-bottom: 30px;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-align: center;
  
  ${mobile(`
    font-size: 20px;
    margin-bottom: 20px;
  `)}
`;

const CategoryDescription = styled.p`
  font-size: 13px;
  font-family: 'Spartan', sans-serif;
  line-height: 26px;
  text-align: center;
  color: #464545;
  margin-bottom: 40px;
  max-width: 500px;
  
  ${mobile(`
    font-size: 12px;
    line-height: 22px;
    margin-bottom: 30px;
  `)}
`;

const ShowMoreButton = styled.button`
  background: none;
  font-family: 'Spartan', sans-serif;
  font-size: 12px;
  font-weight: 400;
  padding: 16px 48px;
  border: 1px solid #585151d1;
  color: #585151d1;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  text-transform: uppercase;
  letter-spacing: 1px;
  
  &:hover {
    background: #585151d1;
    color: #ffffff;
  }
  
  ${mobile(`
    padding: 14px 40px;
    font-size: 11px;
  `)}
`;

const Categories = () => {

  const navigate = useNavigate();

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <SectionContainer totalSections={categories.length}>
          {categories.map((item, index) => (
            <Section key={item.id}>
              {index % 2 === 0 ? (
                <>
                  <ImagePanel 
                    bgImage={item.img} 
                    order={1}
                  />
                  <ContentPanel order={2}>
                    <CategoryTitle>{item.title}</CategoryTitle>
                    <CategoryDescription>
                      {item.description}
                    </CategoryDescription>
                    <ShowMoreButton 
                      onClick={() => navigate(`/products/${item.cat}`)}
                    >
                      Show More
                    </ShowMoreButton>
                  </ContentPanel>
                </>
              ) : (
                <>
                  <ContentPanel order={1}>
                    <CategoryTitle>{item.title}</CategoryTitle>
                    <CategoryDescription>
                      {item.description}
                    </CategoryDescription>
                    <ShowMoreButton 
                      onClick={()=>navigate(`/products/${item.cat}`)}
                    >
                      Show More
                    </ShowMoreButton>
                  </ContentPanel>
                  <ImagePanel 
                    bgImage={item.img} 
                    order={2}
                  />
                </>
              )}
            </Section>
          ))}
        </SectionContainer>
      </Wrapper>
    </>
  )
}

export default Categories