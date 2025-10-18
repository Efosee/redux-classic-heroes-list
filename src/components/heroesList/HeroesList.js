import { useRef, createRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { createSelector } from '@reduxjs/toolkit';

import { useHeroesList } from './useHeroesList';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import './heroesList.css';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

//TODO: У меня теперь есть массив filters, нужно сортировать heroes по фильтрам, если они есть (filters.length > 0)



const HeroesList = () => {
	const { heroes, heroesLoadingStatus, handleDelete, filtredHeroes } = useHeroesList();
	const nodeRefs = useRef({});

	if (heroesLoadingStatus === "loading") {
		return <Spinner />;
	} else if (heroesLoadingStatus === "error") {
		return <h5 className="text-center mt-5">Ошибка загрузки</h5>
	} else if (heroes.length === 0) {
		return <h5 className="text-center mt-5">Героев пока нет</h5>
	} else if (filtredHeroes.length === 0) {
		return <h5 className="text-center mt-5">Не нашли героев по запросу</h5>
	}

	const renderHeroesList = (arr) => {
		return arr.map(({ id, ...props }) => {
			if (!nodeRefs.current[id]) {
				nodeRefs.current[id] = createRef();
			}
			return (
				<CSSTransition key={id} nodeRef={nodeRefs.current[id]} timeout={500} classNames="hero-item">
					<div ref={nodeRefs.current[id]} key={id}>
						<HeroesListItem key={id} {...props} onDelete={() => handleDelete(id, nodeRefs)} />
					</div>
				</CSSTransition>
			)
		})
	}

	const elements = renderHeroesList(filtredHeroes);
	return (
		<TransitionGroup component="ul">
			{elements}
		</TransitionGroup>
	)
}

export default HeroesList;