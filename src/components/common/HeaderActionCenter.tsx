import OutlinesButton from "../ui/Buttons/OutlinesButton"
import PrimaryButton from "../ui/Buttons/PrimaryButton"

const HeaderActionCenter = () => {
    return (
        <div className="w-full flex justify-between">
            <div className="flex gap-4">
                <PrimaryButton text="Field Agent" />
                <PrimaryButton text="Tele Callers" />
            </div>
            <div className="flex gap-4">
                <OutlinesButton text="+Invite Agent" />
                <PrimaryButton text="+Assign Task" />
            </div>
        </div>
    )
}

export default HeaderActionCenter