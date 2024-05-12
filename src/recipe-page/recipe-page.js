import './recipe-page.css';
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const RecipePage = () => {
    const [recipe, setRecipe] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        async function getRecipeById() {
            const response = await fetch(`https://dummyjson.com/recipes/${id}`);
            const data = await response.json();
            console.log(data);
            setRecipe(data);

        }
        getRecipeById();
    }, [id]);

    return (
        <div className="recipePage">
            <header>
                <Link to="/">
                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="16" viewBox="0 0 17 16" fill="none">
                        <path
                            d="M14.6563 7.32133H4.04292L10.3954 1.89276C10.4969 1.80526 10.4353 1.64276 10.301 1.64276H8.6957C8.62495 1.64276 8.55784 1.66776 8.50523 1.7124L1.65033 7.56776C1.58755 7.62134 1.53719 7.68757 1.50269 7.76197C1.46818 7.83638 1.45032 7.91722 1.45032 7.99901C1.45032 8.08081 1.46818 8.16164 1.50269 8.23605C1.53719 8.31045 1.58755 8.37669 1.65033 8.43026L8.54514 14.3213C8.57235 14.3445 8.605 14.357 8.63947 14.357H10.2992C10.4335 14.357 10.4951 14.1928 10.3936 14.107L4.04292 8.67848H14.6563C14.7361 8.67848 14.8014 8.61419 14.8014 8.53562V7.46419C14.8014 7.38562 14.7361 7.32133 14.6563 7.32133Z"
                            fill="black" fill-opacity="0.85" />
                    </svg>
                </Link>
                <h1>{recipe && recipe.name}</h1>
            </header>
            {recipe &&
                <section>
                    <div className="firstSection">
                        <div>
                            <h5>Кухня</h5>
                            <div>
                                <p>{recipe.cuisine}</p>
                            </div>
                        </div>
                        <div>
                            <h5>Теги</h5>
                            <div>
                                <p className="secondary">{recipe.tags.map(item => `#${item}`).join(' ')}</p>
                            </div>
                        </div>
                        <div>
                            <h5>Калорийность</h5>
                            <div>
                                <p>{`${recipe.caloriesPerServing} ккал`}</p>
                                <p className="secondary">100 грамм</p>
                            </div>
                        </div>
                        <div>
                            <h5>Количество порций</h5>
                            <div>
                                <p>{recipe.servings}</p>
                            </div>
                        </div>
                        <div>
                            <h5>Описание</h5>
                            <div>
                                <p>{recipe.instructions}</p>
                            </div>
                        </div>
                    </div>
                    <div className="secondSection">
                        <div>
                            <h5>Общее время приготовления</h5>
                            <div>
                                <p>{`${recipe.cookTimeMinutes + recipe.prepTimeMinutes} минут`}</p>
                            </div>
                        </div>
                        <div>
                            <h5>Инструкции по приготовлению</h5>
                            <ul>
                                {recipe.instructions.map(item => <li>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="10" viewBox="0 0 11 10" fill="none">
                                        <path d="M1.5 5C1.5 2.79086 3.29086 1 5.5 1C7.70914 1 9.5 2.79086 9.5 5C9.5 7.20914 7.70914 9 5.5 9C3.29086 9 1.5 7.20914 1.5 5Z" fill="white" stroke="#1890FF" stroke-width="2" />
                                    </svg>
                                    <p>{item}</p>
                                </li>)}
                            </ul>
                        </div>
                    </div>
                    <div className="thirdSection">
                        <div style={{ backgroundImage: `url(${recipe.image})` }}></div>
                    </div>
                </section>
            }
        </div>
    )
}

export default RecipePage;