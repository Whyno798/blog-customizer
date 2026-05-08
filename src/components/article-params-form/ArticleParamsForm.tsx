import clsx from 'clsx';
import { FormEvent, useEffect, useRef } from 'react';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	isOpen: boolean;
	values: ArticleStateType;
	onArrowClick: () => void;
	onApply: () => void;
	onReset: () => void;
	onChange: <K extends keyof ArticleStateType>(
		key: K,
		value: ArticleStateType[K]
	) => void;
};

export const ArticleParamsForm = ({
	isOpen,
	values,
	onArrowClick,
	onApply,
	onReset,
	onChange,
}: ArticleParamsFormProps) => {
	const asideRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		if (!isOpen) {
			return;
		}

		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as Node;

			if (asideRef.current && !asideRef.current.contains(target)) {
				onArrowClick();
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen, onArrowClick]);

	const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		onApply();
	};

	const handleReset = (evt: FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		onReset();
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={onArrowClick} />

			<aside
				ref={asideRef}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					<Separator />

					<Select
						title='Шрифт'
						selected={values.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(option) => onChange('fontFamilyOption', option)}
					/>

					<RadioGroup
						title='Размер шрифта'
						name='font-size'
						options={fontSizeOptions}
						selected={values.fontSizeOption}
						onChange={(option) => onChange('fontSizeOption', option)}
					/>

					<Select
						title='Цвет шрифта'
						selected={values.fontColor}
						options={fontColors}
						onChange={(option) => onChange('fontColor', option)}
					/>

					<Select
						title='Цвет фона'
						selected={values.backgroundColor}
						options={backgroundColors}
						onChange={(option) => onChange('backgroundColor', option)}
					/>

					<Select
						title='Ширина контента'
						selected={values.contentWidth}
						options={contentWidthArr}
						onChange={(option) => onChange('contentWidth', option)}
					/>

					<Separator />

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
