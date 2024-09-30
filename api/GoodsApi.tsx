import axios from "axios";
import { GoodProps, GoodPropsSimplified } from "@/types";
import { API_URL } from "@/constants/config";

interface GetGood{
    GoodID: number;
	CreatedTime: Date;
	UpdatedTime: Date;
	Title: string;
	Description: string;
	Images: string[];
	Price: number;
	Views: number;
	Likes: number;
	IsInvisible: boolean;
	IsDeleted: boolean;
	IsBought: boolean;
	Tags: string[];
	SellerID: number;
}

export const getGoodsOfHomePage = async (): Promise<GetGood[]> => {
    const response = await axios.get(`${API_URL}/goods`);

    var goods: GoodPropsSimplified[] = [];
    return response.data;
}