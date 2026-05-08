import { CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from 'src/constants/articleProps';

import styles from './app.module.scss';

export const App = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);
	const [appliedState, setAppliedState] =
		useState<ArticleStateType>(defaultArticleState);

	function handleChange<K extends keyof ArticleStateType>(
		key: K,
		value: ArticleStateType[K]
	) {
		setFormState((prev) => ({
			...prev,
			[key]: value,
		}));
	}

	const handleApply = () => {
		setAppliedState(formState);
		setIsOpen(false);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		setAppliedState(defaultArticleState);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': appliedState.fontFamilyOption.value,
					'--font-size': appliedState.fontSizeOption.value,
					'--font-color': appliedState.fontColor.value,
					'--container-width': appliedState.contentWidth.value,
					'--bg-color': appliedState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				isOpen={isOpen}
				values={formState}
				onArrowClick={() => setIsOpen((prev) => !prev)}
				onApply={handleApply}
				onReset={handleReset}
				onChange={handleChange}
			/>

			<Article />
		</main>
	);
};
