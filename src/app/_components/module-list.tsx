"use client";

import { useState, type MouseEventHandler } from "react";
import { getSampleCourseBySlug, type SampleCourse } from "src/lib/sample-courses";
import clsx from "clsx";

type ModuleCardProps = {
    moduleNo: number;
    id: string;
    title: string;
    completed: boolean;
    isCurrentModule: boolean;
    onClick: MouseEventHandler<HTMLButtonElement>;
};

type ModuleListProps = {
    course: SampleCourse;
    currentModule: string;
};

function ModuleCard(props: ModuleCardProps) {
    const { moduleNo, id, title, completed, isCurrentModule, onClick } = props;
    return (
        <button className={clsx("flex flex-row gap-4 px-2 py-2 mx-2 box-border rounded-md", isCurrentModule ? "outline-2 outline-(--color-accent)" : "")} onClick={onClick} data-id={id}>
            {completed ?
                <div className="rounded-[50%] size-[2rem] items-center justify-center flex bg-(--color-accent)">✔</div> :
                <div className="rounded-[50%] size-[2rem] items-center justify-center flex bg-(--color-accent)">{moduleNo}</div>
            }
            <p className="flex flex-row items-center">{title}</p>
        </button>
    );
}

export default function ModuleList(props: ModuleListProps) {
    const { course, currentModule} = props;
    return (
        <div className="w-1/6 h-full min-w-max flex flex-col border-r-2">
            <div className="size-max w-full px-4 py-4 border-b-2">
                <h1 className="text-3xl">{course.code}</h1>
                <h2 className="text-lg">{course.title}</h2>
                <span className="text-muted-foreground">{course.modules.length} modules ({course.durationHours} hours)</span>
            </div>
            <div className="overflow-y-auto flex flex-col py-2 grow-1">
                {
                    course.modules.map((module, i) =>
                        <ModuleCard key={module.id} id={module.id} title={module.title} moduleNo={i + 1} isCurrentModule={module.id === currentModule} completed={i < 2}
                            onClick={(e) => { document.location.href = e.currentTarget.dataset.id; }}
                        />
                    )
                }
            </div>
        </div>
    );
}